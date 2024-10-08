import express from "express";
import Invoice from "../models/invoice.js";

const invoicesRouter = express.Router();

//add invoice => api/invoices
invoicesRouter.post("/", async (req, res) => {
  try {
    const { entreprise, client, product, discount } = req.body;

    // const newEntreprise = await Entreprise.create(entreprise);

    // const newClient = await Client.create(client);

    // const newProduct = await Product.create(product);

    // const invoiceData = {
    //   entreprise: newEntreprise._id,
    //   client: newClient._id,
    //   product: newProduct._id,
    //   totalHT: newProduct.price,
    //   totalTVA: newProduct.price * 0.15,
    //   totalTTC: newProduct.price * 1.15,
    //   discount: discount || 0,
    //   remainsToPay:
    //     newProduct.price * 1.15 -
    //     (discount ? (newProduct.price * 1.15 * discount) / 100 : 0),
    // };

    const invoiceData = {
      entreprise,
      client,
      product,
      totalHT: product.price,
      totalTVA: product.price * 0.15,
      totalTTC: product.price * 1.15,
      discount: discount || 0,
      remainsToPay:
        product.price * 1.15 -
        (discount ? (product.price * 1.15 * discount) / 100 : 0),
    };

    const invoice = new Invoice(invoiceData);
    await invoice.save();
    res.status(201).send(invoice);
  } catch (error) {
    console.log("Error creating hotel:, ", error);
    res.status(500).json({ message: "Something went wrong!" });
  }
});

invoicesRouter.get("/", async (req, res) => {
  const filters = {
    ...(req.query.search && {
      $or: [
        { "client.name": { $regex: req.query.search, $options: "i" } },
        { "entreprise.name": { $regex: req.query.search, $options: "i" } },
        { "product.title": { $regex: req.query.search, $options: "i" } },
      ],
    }),
    ...(req.query.clientName && {
      "client.name": { $regex: req.query.clientName, $options: "i" },
    }),
    ...(req.query.entrepriseName && {
      "entreprise.name": { $regex: req.query.entrepriseName, $options: "i" },
    }),
    ...(req.query.productTitle && {
      "product.title": { $regex: req.query.productTitle, $options: "i" },
    }),
    ...(req.query.creationDate && {
      createdAt: {
        $gte: new Date(req.query.creationDate),
      },
    }),
  };

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 1;
  const skip = (page - 1) * limit;

  try {
    const invoices = await Invoice.find(filters).skip(skip).limit(limit);

    //   .populate("entreprise")
    //   .populate("client")
    //   .populate("product");

    const totalInvoices = await Invoice.countDocuments(filters);

    res.status(200).json({
      invoices,
      currentPage: page,
      totalPages: Math.ceil(totalInvoices / limit),
      totalInvoices,
    });
  } catch (error) {
    console.log("Error fetching invoices: ", error);
    res.status(500).json({ message: "Something went wrong!" });
  }
});

invoicesRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedInvoice = await Invoice.findByIdAndDelete(id);

    if (!deletedInvoice) {
      return res.status(404).json({ message: "Invoice not found!" });
    }

    res.status(200).json({ message: "Invoice deleted successfully!" });
  } catch (error) {
    console.log("Error deleting invoice: ", error);
    res.status(500).json({ message: "Something went wrong!" });
  }
});

// edit invoice by ID
invoicesRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { entreprise, client, product, discount } = req.body;

    const invoiceData = {
      entreprise,
      client,
      product,
      totalHT: product.price,
      totalTVA: product.price * 0.15,
      totalTTC: product.price * 1.15,
      discount: discount || 0,
      remainsToPay:
        product.price * 1.15 -
        (discount ? (product.price * 1.15 * discount) / 100 : 0),
    };

    const updatedInvoice = await Invoice.findByIdAndUpdate(id, invoiceData, {
      new: true,
      runValidators: true,
    });

    if (!updatedInvoice) {
      return res.status(404).json({ message: "Invoice not found!" });
    }

    res.status(200).json(updatedInvoice);
  } catch (error) {
    console.log("Error updating invoice: ", error);
    res.status(500).json({ message: "Something went wrong!" });
  }
});

export default invoicesRouter;
