import mongoose from "mongoose";

// Enum for user roles
export enum UserRoles {
    ADMINISTRATOR = 'admin',
    REVIEWER = 'reviewer',
    EDITOR = 'editor',
    RESEARCHER = 'researcher',
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
      },
      fullName: {
        type: String,
        required: true,
      },
      roles: {
        type: [String],
        enum: Object.values(UserRoles),
        default: [UserRoles.RESEARCHER],
      },
      imageUrl: {
        type: String,
        default: '',
      },
});

const User = mongoose.models?.User || mongoose.model("User", userSchema)

export default User;