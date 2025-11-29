import { Card, CardBody, CardFooter, Skeleton } from "@heroui/react";

export default function ProductSkeleton({ count = 8 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Card
          key={index}
          className="w-full border-none bg-background/60 dark:bg-default-100/50"
        >
          <CardBody className="p-0">
            <Skeleton className="rounded-lg">
              <div className="h-[320px] rounded-lg bg-default-300 dark:bg-default-200"></div>
            </Skeleton>
          </CardBody>
          <CardFooter className="flex-col items-start gap-3 p-4">
            <Skeleton className="w-4/5 rounded-lg">
              <div className="h-4 w-4/5 rounded-lg bg-default-200 dark:bg-default-300"></div>
            </Skeleton>
            <Skeleton className="w-3/5 rounded-lg">
              <div className="h-4 w-3/5 rounded-lg bg-default-200 dark:bg-default-300"></div>
            </Skeleton>
            <Skeleton className="w-2/5 rounded-lg">
              <div className="h-6 w-2/5 rounded-lg bg-default-300 dark:bg-default-200"></div>
            </Skeleton>
          </CardFooter>
        </Card>
      ))}
    </>
  );
}
