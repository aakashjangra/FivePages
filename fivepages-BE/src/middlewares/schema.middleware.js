import { convertToIST } from "../utils/conversion.js";

// Reusable middleware to convert timestamps to IST
export const applyISTConversion = (schema) => {
  schema.pre('save', function (next) {
    if (this.isNew) {
      this.createdAt = convertToIST(this.createdAt);
    }
    this.updatedAt = convertToIST(this.updatedAt);
    next();
  });
}