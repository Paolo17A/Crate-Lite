import NotFoundMessage from "@/components/shared/NotFoundMessage";

export default function NotFound() {
  return (
    <NotFoundMessage
      title="Page not found"
      description="That route doesn't exist. Check the URL or head back home."
    />
  );
}
