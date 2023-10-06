import mongoose, { Schema, mongo } from "mongoose";

/* The code is defining a Mongoose schema for a "site" object. The schema specifies that a site object
will have two properties: "full_url" and "url_id", both of which are of type String. The schema also
includes an options object with the "timestamps" property set to true, which means that Mongoose
will automatically add "createdAt" and "updatedAt" fields to each document created from this schema. */
const siteSchema = new Schema(
  {
    full_url: String,
    url_id: String,
  },
  {
    timestamps: true,
  }
);

/* The line `const Site = mongoose.models.Site || mongoose.model('Site', siteSchema);` is defining a
variable `Site` that represents a Mongoose model for the "Site" schema. */
const Site = mongoose.models.Site || mongoose.model('Site', siteSchema);

export default Site;