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
    <div style="background: linear-gradient(to right, #0077B5, #00A0DC); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
      <img src="/assets/images/bl-nobg.png" alt="Atendeo Logo" style="width: 150px; margin-bottom: 20px;border-radius: 10px;">
      <h1 style="color: white; margin: 0; font-size: 28px;">ATENDEO</h1>
    </div>
    <div style="background-color: #ffffff; padding: 10px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
      <h3 style="font-size: 18px; color: #0077B5;"><strong>Event Title: </strong>${
        event.title
      }</h3>
      <h3 style="font-size: 18px; color: #0077B5;"><strong>Event Details: </strong>${
        event.description
      }</h3>
      <h3 style="font-size: 18px; color: #0077B5;"><strong>Scheduled For: </strong>${event.eventDate.toDateString()}</h3>
      <p>We regret to inform you that the event with the above details has been cancelled by the organizer and your deposit has been refunded.</p>
      <p>If you have any questions or need assistance, our support team is always here to help.</p>
      <p>Best regards,<br>The Atendeo Team</p>
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
    <div style="background: linear-gradient(to right, #0077B5, #00A0DC); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
      <img src="/assets/images/bl-nobg.png" alt="Atendeo Logo" style="width: 150px; margin-bottom: 20px;border-radius: 10px;">
      <h1 style="color: white; margin: 0; font-size: 28px;">ATENDEO</h1>
    </div>
    <div style="background-color: #ffffff; padding: 10px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
      <h3 style="font-size: 18px; color: #0077B5;"><strong>Event Title: </strong>${
        event.title
      }</h3>
      <h3 style="font-size: 18px; color: #0077B5;"><strong>Event Details: </strong>${
        event.description
      }</h3>
      <h3 style="font-size: 18px; color: #0077B5;"><strong>Scheduled For: </strong>${event.eventDate.toDateString()}</h3>
      <p>Your attendance to the upcoming event has been cencelled and half of your deposit has been refunded.</p>
      <p>If you have any questions or need assistance, our support team is always here to help.</p>
      <p>Best regards,<br>The Atendeo Team</p>
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
    <div style="background: linear-gradient(to right, #0077B5, #00A0DC); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
      <img src="/assets/images/bl-nobg.png" alt="Atendeo Logo" style="width: 150px; margin-bottom: 20px;border-radius: 10px;">
      <h1 style="color: white; margin: 0; font-size: 28px;">ATENDEO</h1>
    </div>
    <div style="background-color: #ffffff; padding: 10px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
      <h3 style="font-size: 18px; color: #0077B5;"><strong>Event Title: </strong>${
        event.title
      }</h3>
      <h3 style="font-size: 18px; color: #0077B5;"><strong>Event Details: </strong>${
        event.description
      }</h3>
      <h3 style="font-size: 18px; color: #0077B5;"><strong>Scheduled For: </strong>${event.eventDate.toDateString()}</h3>
      <p>This email is sent to you to remind you of the upcoming event with the details above.</p>
      <p>If you have any questions or need assistance, our support team is always here to help.</p>
      <p>Best regards,<br>The Atendeo Team</p>
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
    <div style="background: linear-gradient(to right, #0077B5, #00A0DC); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
      <img src="/assets/images/bl-nobg.png" alt="Atendeo Logo" style="width: 150px; margin-bottom: 20px;border-radius: 10px;">
      <h1 style="color: white; margin: 0; font-size: 28px;">ATENDEO</h1>
    </div>
    <div style="background-color: #ffffff; padding: 10px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
      <h3 style="font-size: 18px; color: #0077B5;"><strong>Event Title: </strong>${
        event.title
      }</h3>
      <h3 style="font-size: 18px; color: #0077B5;"><strong>Event Details: </strong>${
        event.description
      }</h3>
      <h3 style="font-size: 18px; color: #0077B5;"><strong>Scheduled For: </strong>${event.eventDate.toDateString()}</h3>
      <p>This is to notify you that this event has been concluded and your account has been refunded with your deposit and flaked members bonus successfully added to your balance and available for withdrawal.</p>
      <p>If you have any questions or need assistance, our support team is always here to help.</p>
      <p>Best regards,<br>The Atendeo Team</p>
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
    <div style="background: linear-gradient(to right, #0077B5, #00A0DC); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
      <img src="/assets/images/bl-nobg.png" alt="Atendeo Logo" style="width: 150px; margin-bottom: 20px;border-radius: 10px;">
      <h1 style="color: white; margin: 0; font-size: 28px;">ATENDEO</h1>
    </div>
    <div style="background-color: #ffffff; padding: 10px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
      <h3 style="font-size: 18px; color: #0077B5;"><strong>Event Title: </strong>${
        event.title
      }</h3>
      <h3 style="font-size: 18px; color: #0077B5;"><strong>Event Details: </strong>${
        event.description
      }</h3>
      <h3 style="font-size: 18px; color: #0077B5;"><strong>Scheduled For: </strong>${event.eventDate.toDateString()}</h3>
      <p>This is to notify you that you missed this event and your deposit has been splitted between the present members.</p>
      <p>If you have any questions or need assistance, our support team is always here to help.</p>
      <p>Best regards,<br>The Atendeo Team</p>
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
    <div style="background: linear-gradient(to right, #0077B5, #00A0DC); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
      <img src="/assets/images/bl-nobg.png" alt="Atendeo Logo" style="width: 150px; margin-bottom: 20px;border-radius: 10px;">
      <h1 style="color: white; margin: 0; font-size: 28px;">ATENDEO</h1>
    </div>
    <div style="background-color: #ffffff; padding: 10px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
      <h3 style="font-size: 18px; color: #0077B5;"><strong>Event Title: </strong>${
        event.title
      }</h3>
      <h3 style="font-size: 18px; color: #0077B5;"><strong>Event Details: </strong>${
        event.description
      }</h3>
      <h3 style="font-size: 18px; color: #0077B5;"><strong>Scheduled For: </strong>${event.eventDate.toDateString()}</h3>
      <p>The message below is sent to you by the organiser of this event</p>
      <p>${message}</p>
      <p>If you have any questions or need assistance, our support team is always here to help.</p>
      <p>Best regards,<br>The Atendeo Team</p>
    </div>
  </body>
  </html>
  `;
}
