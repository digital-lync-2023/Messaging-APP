import { Message } from "@prisma/client";
import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";
import { MessagesPaginationCursor, SafeUser } from "..";

export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: boolean) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  "users:user_online": (username: string) => void;
  "users:user_offline": (username: string) => void;
  "users:user_created": (username: string) => void;
  "messages:new_message": (message: Message) => void;
}

export interface ClientToServerEvents {
  "messages:new_message": (
    message: Pick<Message, "text" | "toUsername">
  ) => void;
  "messages:get_new_messages": (
    cursor: MessagesPaginationCursor,
    callback: (page: { data: Message[]; hasMore: boolean }) => void
  ) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  user: SafeUser;
}

export type AppSocket = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;

export type SocketIOMiddleware = (
  socket: AppSocket,
  next: (err?: ExtendedError | undefined) => void
) => void;
