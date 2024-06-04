import { createFileRoute } from "@tanstack/react-router";

import "../App.css";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { api } from "../lib/api";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/")({
  component: Index,
});

const getTotalSpent = async () => {
  const res = await api.expenses["total-spent"].$get();
  if (!res.ok) {
    throw new Error("Failed to fetch total spent");
  }
  const data = await res.json();
  return data;
};

function Index() {
  const query = useQuery({
    queryKey: ["get-total-spent"],
    queryFn: getTotalSpent,
  });

  const { data, error, isPending } = query;

  return (
    <Card className="w-[350px] m-auto">
      <CardHeader>
        <CardTitle>Total Spent </CardTitle>
        <CardDescription>The total amount you've spent</CardDescription>
      </CardHeader>
      <CardContent>{isPending ? "Loading..." : data?.total}</CardContent>
      {error && <CardContent>{error.message}</CardContent>}
    </Card>
  );
}
