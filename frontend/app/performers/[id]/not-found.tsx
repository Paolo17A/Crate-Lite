import NotFoundMessage from "@/components/shared/NotFoundMessage";

export default function PerformerNotFound() {
  return (
    <NotFoundMessage
      title="Performer not found"
      description="That profile isn't in our catalog."
      actions={[
        { href: "/search", label: "Browse performers" },
        { href: "/", label: "Back to home", variant: "secondary" },
      ]}
    />
  );
}
