import { Event } from "@prisma/client";

export function renderEventDeletionEmailTemplate(event: Event) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[ATENDEO] Event Cancellation Notification</title>
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 10px;">
   <div style="background-color: black; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
      <img src=${`${process.env.NEXT_PUBLIC_APP_URL}/bl-nobg.png`} alt="Atendeo Logo" style="width: 300px; height: 300px;">
    </div>
    <div style="background-color: #ffffff; padding: 10px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
      <h3><strong style="font-size: 18px; color: #3b82f6;">Event Title: </strong>${
        event.title
      }</h3>
      <h3><strong style="font-size: 18px; color: #3b82f6;">Event Details: </strong>${
        event.description
      }</h3>
      <h3><strong style="font-size: 18px; color: #3b82f6;">Scheduled For: </strong>${
        event.eventDate
      }</h3>
      <p>We regret to inform you that the event with the above details has been cancelled by the organizer and your deposit has been refunded.</p>
      <p style="color: gray; margin-top: 30px;">If you have any questions or need assistance, our support team is always here to help.</p>
      <p style="color: gray;">Best regards,<br>The Atendeo Team</p>
    </div>
  </body>
  </html>
  `;
}

export function renderEventAttendanceDeletionEmailTemplate(event: Event) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[ATENDEO] Event Attendance Cancellation Notification</title>
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 10px;">
    <div style="background-color: black; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
      <img src=${`${process.env.NEXT_PUBLIC_APP_URL}/bl-nobg.png`} alt="Atendeo Logo" style="width: 300px; height: 300px;">
    </div>
    <div style="background-color: #ffffff; padding: 10px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
      <h3><strong style="font-size: 18px; color: #3b82f6;">Event Title: </strong>${
        event.title
      }</h3>
      <h3><strong style="font-size: 18px; color: #3b82f6;">Event Details: </strong>${
        event.description
      }</h3>
      <h3><strong style="font-size: 18px; color: #3b82f6;">Scheduled For: </strong>${
        event.eventDate
      }</h3>
      <p>Your attendance to the upcoming event has been cencelled and half of your deposit has been refunded.</p>
      <p style="color: gray; margin-top: 30px;">If you have any questions or need assistance, our support team is always here to help.</p>
      <p style="color: gray;">Best regards,<br>The Atendeo Team</p>
    </div>
  </body>
  </html>
  `;
}

export function renderEventNotificationEmailTemplate(event: Event) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[ATENDEO] Event Notification Email</title>
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 10px;">
   <div style="background-color: black; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
      <img src=${`${process.env.NEXT_PUBLIC_APP_URL}/bl-nobg.png`} alt="Atendeo Logo" style="width: 300px; height: 300px;">
    </div>
    <div style="background-color: #ffffff; padding: 10px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
      <h3><strong style="font-size: 18px; color: #3b82f6;">Event Title: </strong>${
        event.title
      }</h3>
      <h3><strong style="font-size: 18px; color: #3b82f6;">Event Details: </strong>${
        event.description
      }</h3>
      <h3><strong style="font-size: 18px; color: #3b82f6;">Scheduled For: </strong>${
        event.eventDate
      }</h3>
      <p>This email is sent to you to remind you of the upcoming event with the details above.</p>
      <p style="color: gray; margin-top: 30px;">If you have any questions or need assistance, our support team is always here to help.</p>
      <p style="color: gray;">Best regards,<br>The Atendeo Team</p>
    </div>
  </body>
  </html>
  `;
}

export function renderEventPresentMemberEmailTemplate(event: Event) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[ATENDEO] Event Notification Email</title>
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 10px;">
    <div style="background-color: black; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
      <img src=${`${process.env.NEXT_PUBLIC_APP_URL}/bl-nobg.png`} alt="Atendeo Logo" style="width: 300px; height: 300px;">
    </div>
    <div style="background-color: #ffffff; padding: 10px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
      <h3><strong style="font-size: 18px; color: #3b82f6;">Event Title: </strong>${
        event.title
      }</h3>
      <h3><strong style="font-size: 18px; color: #3b82f6;">Event Details: </strong>${
        event.description
      }</h3>
      <h3><strong style="font-size: 18px; color: #3b82f6;">Scheduled For: </strong>${
        event.eventDate
      }</h3>
      <p>This is to notify you that this event has been concluded and your account has been refunded with your deposit and flaked members bonus successfully added to your balance and available for withdrawal.</p>
      <p style="color: gray; margin-top: 30px;">If you have any questions or need assistance, our support team is always here to help.</p>
      <p style="color: gray;">Best regards,<br>The Atendeo Team</p>
    </div>
  </body>
  </html>
  `;
}

export function renderEventAbsentMemberEmailTemplate(event: Event) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[ATENDEO] Event Notification Email</title>
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 10px;">
    <div style="background-color: black; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
      <img src=${`${process.env.NEXT_PUBLIC_APP_URL}/bl-nobg.png`} alt="Atendeo Logo" style="width: 300px; height: 300px;">
    </div>
    <div style="background-color: #ffffff; padding: 10px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
      <h3><strong style="font-size: 18px; color: #3b82f6;">Event Title: </strong>${
        event.title
      }</h3>
      <h3><strong style="font-size: 18px; color: #3b82f6;">Event Details: </strong>${
        event.description
      }</h3>
      <h3><strong style="font-size: 18px; color: #3b82f6;">Scheduled For: </strong>${
        event.eventDate
      }</h3>
      <p>This is to notify you that you missed this event and your deposit has been splitted between the present members.</p>
      <p style="color: gray; margin-top: 30px;">If you have any questions or need assistance, our support team is always here to help.</p>
      <p style="color: gray;">Best regards,<br>The Atendeo Team</p>
    </div>
  </body>
  </html>
  `;
}

export function renderEventMessageEmailTemplate(event: Event, message: string) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[ATENDEO] Event Notification Email</title>
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 10px;">
    <div style="background-color: black; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
      <img src=${`${process.env.NEXT_PUBLIC_APP_URL}/bl-nobg.png`} alt="Atendeo Logo" style="width: 300px; height: 300px;">
    </div>
    <div style="background-color: #ffffff; padding: 10px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
      <h3><strong style="font-size: 18px; color: #3b82f6;">Event Title: </strong>${
        event.title
      }</h3>
      <h3><strong style="font-size: 18px; color: #3b82f6;">Event Details: </strong>${
        event.description
      }</h3>
      <h3><strong style="font-size: 18px; color: #3b82f6;">Scheduled For: </strong>${
        event.eventDate
      }</h3>
      <p>The message below is sent to you by the organiser of this event</p>
      <p>${message}</p>
      <p style="color: gray; margin-top: 30px;">If you have any questions or need assistance, our support team is always here to help.</p>
      <p style="color: gray;">Best regards,<br>The Atendeo Team</p>
    </div>
  </body>
  </html>
  `;
}
