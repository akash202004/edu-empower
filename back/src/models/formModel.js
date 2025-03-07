import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"; // if no need than uninstall mongoose-aggregate-paginate-v2


const formSchema = new Schema({
    studentId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    annualIncome: {
        type: Number,
        required: true
    },
    documents: {
        type: [String],
        required: [true, "Please upload at least one document"],  // Array of financial documents cloudnary url
    },
    applicationStatus: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
    }
},
{
    timestamps: true
});

formSchema.plugin(mongooseAggregatePaginate);   // if no need than uninstall mongoose-aggregate-paginate-v2

export const form = mongoose.model("Form", formSchema);
