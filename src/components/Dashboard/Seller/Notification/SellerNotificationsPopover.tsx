import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { NotificationItem } from "@/types/dashboard";
import { demoNotifications } from "@/data/mockData";
import React from "react";
import { Button } from "@/components/ui/button";
import { Bell, CheckCheck, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { NotificationRow } from "./NotificationRow";
export function SellerNotificationsPopover() {
  const [items, setItems] =
    React.useState<NotificationItem[]>(demoNotifications);

  const unreadCount = React.useMemo(
    () => items.filter((n) => n.unread).length,
    [items],
  );

  const markAllRead = () => {
    setItems((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const clearAll = () => {
    setItems([]);
  };

  const openItem = (id: string) => {
    // ✅ here you can navigate based on type (order -> order details, etc.)
    setItems((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n)),
    );
  };

  const unread = items.filter((n) => n.unread);
  const all = items;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="relative cursor-pointer">
          <Bell className="size-5 xl:size-6 text-gray-900" />
          <span className="absolute -top-1 -right-1 size-4 bg-[#FF6900] border-2 border-white rounded-full flex items-center justify-center text-[10px] text-white font-bold">
            {unreadCount}
          </span>
        </div>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={12}
        className={cn(
          "w-[420px] rounded-3xl border border-border bg-popover p-0 overflow-hidden",
          "shadow-[0_18px_40px_rgba(0,0,0,0.18)]",
        )}
      >
        {/* Header */}
        <div className="px-5 pt-5 pb-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-[18px] font-semibold text-foreground">
                Notifications
              </h3>
              <p className="mt-1 text-[13px] text-muted-foreground">
                Seller updates: orders, payouts, customer messages.
              </p>
            </div>

            <div className="flex items-center gap-2">
              {unreadCount > 0 ? (
                <Badge
                  className="rounded-full bg-primary/10 text-primary"
                  variant="secondary"
                >
                  {unreadCount} new
                </Badge>
              ) : (
                <Badge className="rounded-full" variant="secondary">
                  All caught up
                </Badge>
              )}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between gap-2">
            <Button
              type="button"
              variant="secondary"
              className="h-9 rounded-2xl"
              onClick={markAllRead}
              disabled={unreadCount === 0}
            >
              <CheckCheck className="mr-2 h-4 w-4" />
              Mark all read
            </Button>

            <Button
              type="button"
              variant="ghost"
              className="h-9 rounded-2xl text-muted-foreground hover:text-foreground"
              onClick={clearAll}
              disabled={items.length === 0}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Clear
            </Button>
          </div>
        </div>

        <Separator />

        {/* Tabs */}
        <Tabs defaultValue="unread" className="w-full">
          <div className="px-5 pt-4">
            <TabsList className="grid w-full grid-cols-2 rounded-2xl bg-muted/10 p-1">
              <TabsTrigger value="unread" className="rounded-xl">
                Unread
              </TabsTrigger>
              <TabsTrigger value="all" className="rounded-xl">
                All
              </TabsTrigger>
            </TabsList>
          </div>
          {/* unread tabs content */}
          <TabsContent value="unread" className="m-0 ">
            <ScrollArea className="h-[360px] px-5 pb-5 pt-4">
              {unread.length === 0 ? (
                <div className="flex h-[320px] flex-col items-center justify-center text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted/10">
                    <Bell className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="mt-4 text-[14px] font-semibold text-foreground">
                    No unread notifications
                  </p>
                  <p className="mt-1 text-[13px] text-muted-foreground">
                    You’re all set. New updates will appear here.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col h-full">
                  <div className="space-y-3 overflow-y-auto grow">
                    {unread.map((n) => (
                      <NotificationRow key={n.id} item={n} onClick={openItem} />
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    className="h-10 w-full rounded-2xl"
                    onClick={() => {
                      // navigate("/seller-dashboard/notifications")
                      console.log("View all notifications");
                    }}
                  >
                    View all notifications
                  </Button>
                </div>
              )}
            </ScrollArea>
          </TabsContent>

          {/* all tabs content */}
          <TabsContent value="all" className="m-0 overflow-hidden">
            <div className="h-[360px] px-5 pb-5 pt-4">
              {all.length === 0 ? (
                <div className="flex h-[320px] flex-col items-center justify-center text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted/10">
                    <Bell className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="mt-4 text-[14px] font-semibold text-foreground">
                    No notifications yet
                  </p>
                  <p className="mt-1 text-[13px] text-muted-foreground">
                    When something happens, it will show up here.
                  </p>
                </div>
              ) : (
                <div className="space-y-3 overflow-y-scroll h-full">
                  {all.map((n) => (
                    <NotificationRow key={n.id} item={n} onClick={openItem} />
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
}
