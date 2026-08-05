import NotFoundMessage from "@/components/shared/NotFoundMessage";

export default function BookingPerformerNotFound() {
  return (
    <NotFoundMessage
      title="Performer not found"
      description="We can't start a booking for that profile — it isn't in our catalog."
      actions={[
        { href: "/search", label: "Browse performers" },
        { href: "/", label: "Back to home", variant: "secondary" },
      ]}
    />
  );
}
