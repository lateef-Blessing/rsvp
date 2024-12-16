import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

interface Props {
  params: {
    id: string;
    code: string;
  };
}

export default async function CodePage({ params }: Props) {
  const user = await currentUser();

  if (!user) {
    return redirect("/auth/login");
  }

  if (!params) {
    return redirect("/events");
  }

  // TODO: Move outside the component
  const isMemberOfTheEvent = await db.event.findFirst({
    where: {
      id: params.id,
      inviteCode: params.code,
      members: {
        some: {
          userId: user.id,
        },
      },
    },
  });

  if (isMemberOfTheEvent) {
    await db.event.update({
      where: {
        id: params.id,
      },
      data: {
        members: {
          update: {
            where: {
              userId_eventId: {
                userId: user.id as string,
                eventId: params.id as string,
              },
            },
            data: {
              attended: true,
            },
          },
        },
      },
    });

    return redirect(`/events/${params.id}`);
  } else {
    return redirect("/events");
  }
}
