import { UserSchema } from "../models";

const Auth = {
    create: async (props: any) => {
        const { firstName,
            secondName,
            dateBirth,
            phoneNumber,
            email,
            homeAddress,
            nationalNumber,
            branch,
            rank,
            regiment,
            isRegular,
            serviceNumber,
            workAddress,
            encryptedPassword } = props;

        try {
            const newData = new UserSchema({
                firstName: firstName,
                secondName: secondName,
                dateBirth: dateBirth,
                phoneNumber: phoneNumber,
                email: email,
                homeAddress: homeAddress,
                nationalNumber: nationalNumber,
                branch: branch,
                rank: rank,
                regiment: regiment,
                isRegular: isRegular,
                serviceNumber: serviceNumber,
                workAddress: workAddress,
                encryptedPassword: encryptedPassword
            });

            const saveData = await newData.save();

            if (!saveData) {
                throw new Error("Database Error");
            }

            return saveData;
        } catch (err: any) {
            throw new Error(err.message);
        }
    },
    find: async (props: any) => {
        const { filter } = props;

        try {
            const result = await UserSchema.findOne(filter);

            return result;
        } catch (err: any) {
            throw new Error(err.message);
        }
    },
    fintById: async (props: any) => {
        const { param } = props;
        try {
            const result = await UserSchema.findById(param);

            return result;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
};

export default Auth;
