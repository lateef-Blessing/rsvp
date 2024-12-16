import { Event } from "@prisma/client";
import nodemailer from "nodemailer";

import {
  renderEventAbsentMemberEmailTemplate,
  renderEventAttendanceDeletionEmailTemplate,
  renderEventDeletionEmailTemplate,
  renderEventMessageEmailTemplate,
  renderEventNotificationEmailTemplate,
  renderEventPresentMemberEmailTemplate,
} from "@/lib/mail-template";

const domain = process.env.NEXT_PUBLIC_APP_URL;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.NEXT_PUBLIC_EMAIL_USERNAME,
    pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD,
  },
});

// Auth Mails
export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  try {
    const mail = await transporter.sendMail({
      from: process.env.NEXT_PUBLIC_PERSONAL_EMAIL,
      to: email,
      subject: "2FA Code",
      html: `<p>Your 2FA code: ${token}</p>`,
    });
  } catch (error) {
    console.log(error);
  }
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  try {
    const mail = await transporter.sendMail({
      from: process.env.NEXT_PUBLIC_PERSONAL_EMAIL,
      to: email,
      subject: "Reset your password",
      html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`,
    });
  } catch (error) {
    console.log(error);
  }
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  try {
    const mail = await transporter.sendMail({
      from: process.env.NEXT_PUBLIC_PERSONAL_EMAIL,
      to: email,
      subject: "Confirm your email",
      html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
    });
  } catch (error) {
    console.log(error);
  }
};

// Event Mails
export const sendEventNotificationEmail = async (
  email: string,
  event: Event
) => {
  try {
    const mail = await transporter.sendMail({
      from: process.env.NEXT_PUBLIC_PERSONAL_EMAIL,
      to: email,
      subject: `[ATENDEO] Event Notification`,
      html: renderEventNotificationEmailTemplate(event),
    });
  } catch (error) {
    console.log(error);
  }
};

export const sendEventDeletionEmail = async (email: string, event: Event) => {
  try {
    await transporter.sendMail({
      from: process.env.NEXT_PUBLIC_PERSONAL_EMAIL,
      to: email,
      subject: "[ATENDEO] Event Cancellation Notification",
      html: renderEventDeletionEmailTemplate(event),
    });
  } catch (error) {
    console.log(error);
  }
};

export const sendEventAttendanceDeletionEmail = async (
  email: string,
  event: Event
) => {
  try {
    await transporter.sendMail({
      from: process.env.NEXT_PUBLIC_PERSONAL_EMAIL,
      to: email,
      subject: "[ATENDEO] Event Attendance Cancellation Notification",
      html: renderEventAttendanceDeletionEmailTemplate(event),
    });
  } catch (error) {
    console.log(error);
  }
};

export const sendPresentMembersEmail = async (email: string, event: Event) => {
  try {
    const mail = await transporter.sendMail({
      from: process.env.NEXT_PUBLIC_PERSONAL_EMAIL,
      to: email,
      subject: `You were present at this event`,
      html: renderEventPresentMemberEmailTemplate(event),
    });
  } catch (error) {
    console.log(error);
  }
};

export const sendAbsentMembersEmail = async (email: string, event: Event) => {
  try {
    const mail = await transporter.sendMail({
      from: process.env.NEXT_PUBLIC_PERSONAL_EMAIL,
      to: email,
      subject: `You flaked this event`,
      html: renderEventAbsentMemberEmailTemplate(event),
    });
  } catch (error) {
    console.log(error);
  }
};

export const sendEventMessageEmail = async (
  email: string,
  message: string,
  event: Event
) => {
  try {
    const mail = await transporter.sendMail({
      from: process.env.NEXT_PUBLIC_PERSONAL_EMAIL,
      to: email,
      subject: `Message from Event Organiser`,
      html: renderEventMessageEmailTemplate(event, message),
    });
  } catch (error) {
    console.log(error);
  }
};
