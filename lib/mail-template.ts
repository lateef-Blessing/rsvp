import { Event } from '@prisma/client'

import { formatDateTime } from '@/lib/utils'

export function renderEventDeletionEmailTemplate(event: Event) {
  return `
  <html lang="en">
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
        formatDateTime(event.eventDate).dateTime
      }</h3>
      <p>We regret to inform you that the event with the above details has been cancelled by the organizer and your deposit has been refunded.</p>
      <p style="color: gray; margin-top: 30px;">If you have any questions or need assistance, our support team is always here to help.</p>
      <p style="color: gray;">Best regards,<br>The Atendeo Team</p>
    </div>
  </body>
  </html>
  `
}

export function renderEventAttendanceDeletionEmailTemplate(event: Event) {
  return `
  <html lang="en">
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
        formatDateTime(event.eventDate).dateTime
      }</h3>
      <p>Your attendance to the upcoming event has been cencelled and half of your deposit has been refunded.</p>
      <p style="color: gray; margin-top: 30px;">If you have any questions or need assistance, our support team is always here to help.</p>
      <p style="color: gray;">Best regards,<br>The Atendeo Team</p>
    </div>
  </body>
  </html>
  `
}

export function renderEventNotificationEmailTemplate(event: Event) {
  return `
  <html lang="en">
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
        formatDateTime(event.eventDate).dateTime
      }</h3>
      <p>This email is sent to you to remind you of the upcoming event with the details above.</p>
      <p style="color: gray; margin-top: 30px;">If you have any questions or need assistance, our support team is always here to help.</p>
      <p style="color: gray;">Best regards,<br>The Atendeo Team</p>
    </div>
  </body>
  </html>
  `
}

export function renderEventPresentMemberEmailTemplate(event: Event) {
  return `
  <html lang="en">
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
        formatDateTime(event.eventDate).dateTime
      }</h3>
      <p>This is to notify you that this event has been concluded and your account has been refunded with your deposit and flaked members bonus successfully added to your balance and available for withdrawal.</p>
      <p style="color: gray; margin-top: 30px;">If you have any questions or need assistance, our support team is always here to help.</p>
      <p style="color: gray;">Best regards,<br>The Atendeo Team</p>
    </div>
  </body>
  </html>
  `
}

export function renderEventAbsentMemberEmailTemplate(event: Event) {
  return `
  <html lang="en">
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
        formatDateTime(event.eventDate).dateTime
      }</h3>
      <p>This is to notify you that you missed this event and your deposit has been splitted between the present members.</p>
      <p style="color: gray; margin-top: 30px;">If you have any questions or need assistance, our support team is always here to help.</p>
      <p style="color: gray;">Best regards,<br>The Atendeo Team</p>
    </div>
  </body>
  </html>
  `
}

export function renderEventMessageEmailTemplate(event: Event, message: string) {
  return `
  <html lang="en">
  <body style="font-family: Arial, sans-serif; line-height: 1.4; color: #333; max-width: 600px; margin: 0; padding: 5px;">
    <div style="padding: 0px 10px; text-align: left;">
    <div style="height: 200px;">
    <img src=${`${process.env.NEXT_PUBLIC_APP_URL}/bl-nobg.png`} alt="Atendeo Logo" width="100%">
    </div>
      <h4 style="margin: 5px opx; padding: 0px;">Hello there,</h4>
      <h4 style="margin: 5px 0px; padding: 0px;">A message was broadcasted to you from the organiser of this event.</h4>
      <h4 style="margin-top: 20px; padding: 0px;">Event Details:</h4>
      </div>
      <div style="background-color: #ffffff; padding-left: 50px; padding-right: 10px;">
      <h3><strong style="font-size: 18px; color: #3b82f6;">Title: </strong>${
        event.title
      }</h3>
      <h3><strong style="font-size: 18px; color: #3b82f6;">Time: </strong>${
        formatDateTime(event.eventDate).dateTime
      }</h3>
        <h3><strong style="font-size: 18px; color: #3b82f6;">Location: </strong>${
          event.location
        }</h3>
        <h3><strong style="font-size: 18px; color: #3b82f6;">Message: </strong>${message}</h3>
        </div>
      <p style="color: gray; margin-top: 30px;">We can't wait to see you there!</p>
       <p  style="color: gray; margin-top: 20px;"> If you have any questions or need assistance, our support team is always here to help.</p>
      <p style="color: gray;">Warm regards,<br>The Atendeo Team</p>
  </body>
  </html>
  `
}
