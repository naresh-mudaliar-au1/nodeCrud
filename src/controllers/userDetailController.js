import { userDetailModel } from "../model";

const getDetail = async (req, res) => {
  try {
    const { currentUser } = req;

    const getUser = await userDetailModel.findOne({
      userId: currentUser._id,
    });

    if (!getUser) throw new Error("User-Detail Not Found");

    getUser && res.status(200).send({ success: true, data: getUser });
  } catch (error) {
    res.status(400).send({ success: false, Error: error.message });
  }
};

const enrollUser = async (req, res) => {
  try {
    const { body, currentUser } = req;

    let filter = { userId: currentUser._id };

    let data = {};

    const getUser = await userDetailModel.findOne(filter);

    if (getUser) {
      let update = { ...body };
      let options = { new: true };

      const updateUser = await userDetailModel.findOneAndUpdate(
        filter,
        update,
        options
      );

      data = { ...updateUser._doc };
    } else {
      const enroll = new userDetailModel({
        ...body,
        userId: currentUser._id,
      });

      const saveUser = await enroll.save();

      data = { ...saveUser._doc };

      if (!saveUser) throw new Error("Error Saving Detail");
    }

    res.status(200).send({ success: true, data });
  } catch (error) {
    res.status(400).send({ success: false, Error: error.message });
  }
};

export default { getDetail, enrollUser };
