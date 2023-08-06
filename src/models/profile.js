import { Schema, SchemaTypes, model } from 'mongoose';

const profileSchema = new Schema({
    picture: SchemaTypes.Buffer,
    // TODO: implement picture functionality
    bio: SchemaTypes.String
});

export const Profile = model('profile', profileSchema);