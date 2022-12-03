import { axiosInstance } from "./../config/settings";
import axios from "axios";
import { Channel } from "../types/channel";
import { Profile } from "../types/profile";

export async function login(email: string, password: string) {
  await axiosInstance
    .post("account/signin", {
      email: email,
      password: password,
    })
    .then((response) => {
      localStorage.setItem("token", response.data.data.token);
    });
}

export async function register(email: string, password: string) {
  await axiosInstance.post("account/signup", {
    email: email,
    password: password,
  });
}

export async function changePassword(
  email: string,
  password: string,
  newPassword: string
) {
  await axiosInstance
    .patch("account/change-password", {
      email: email,
      password: password,
      newPassword: newPassword,
    })
    .then((response) => {
      console.log(response);
    });
}

export async function getProfile(): Promise<Profile> {
  let profile: any;
  await axiosInstance
    .get("account/profile/current-profile")
    .then((response) => {
      profile = {
        userId: response.data.data.id,
        email: response.data.data.email,
        name: response.data.data.name,
        avatar: response.data.data.avatar,
        sex: response.data.data.sex,
        dateOfBirth: response.data.data.dob,
        country: response.data.data.national,
        channelID: response.data.data.channels.map(
          (channel: { id: number }) => channel.id
        ),
      };
      localStorage.setItem("user", JSON.stringify(profile));
    });
  return profile;
}

export async function updateProfile(
  name: string,
  dob: string,
  sex: string,
  national: string,
  avatar: string
) {
  await axiosInstance.patch("account/profile/current-profile", {
    name: name,
    dob: dob,
    sex: sex,
    national: national,
    avatar: avatar,
  });
}

export async function resendEmail(email: string) {
  await axiosInstance.post("mail/validate-email", {
    email: email,
  });
}

export async function createChannel(channelName: string) {
  let id: number = await axiosInstance
    .post("channel/create-channel", {
      name: channelName,
    })
    .then((response) => {
      console.log(`Create channel ${channelName} successfully`);
      return response.data.data.id;
    })
    .catch((error) => {
      console.log(
        `Create channel ${channelName} failed. Error: ${error.response.data.error}`
      );
    });
  return id;
}

export async function getChannel(channelId: number): Promise<Channel> {
  let channel: Channel = {
    id: -1,
    members: [],
    avatar: "",
    name: "",
    boards: [],
  };
  await axiosInstance
    .get(`channel/channelId=${channelId}`)
    .then((response) => {
      channel = {
        id: response.data.data.id,
        members: response.data.data.members,
        avatar: response.data.data.avatar,
        name: response.data.data.name,
        boards: response.data.data.taskColumns,
      };
    })
    .catch((error) => {
      console.log(error.response.data.error);
    });
  return channel;
}

export async function getUserProfile(userId: any): Promise<Profile> {
  let userProfile: any;
  await axiosInstance
    .get(`account/profile/userId=${userId}`)
    .then((response) => {
      userProfile = {
        id: response.data.data.id,
        avatar: response.data.data.avatar,
        name: response.data.data.name,
      };
    });
  return userProfile;
}

export async function addMember(email: string, id: number) {
  await axiosInstance.patch(`channel/add/channelId=${id}?email=${email}`);
}
