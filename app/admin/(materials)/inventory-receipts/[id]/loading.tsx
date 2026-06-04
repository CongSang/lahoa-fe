"use client"

import { Card, CardContent, Skeleton } from "@/components/index";

const loading = () => {
  return (
    <div>
      <h2 className="text-xl font-bold tracking-tight text-foreground mb-4 leading-8">
         Chi tiết hóa đơn
      </h2>

      <Card className="space-y-4">
        <CardContent className="space-y-6">
          <div className="flex items-center justify-start gap-2">
            <h3 className="font-semibold text-lg">Thông tin phiếu</h3>
          </div>

          <div className="grid grid-cols-12 gap-3">
            <div className="space-y-2 col-span-12 sm:col-span-6">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-8 w-full" />
            </div>
            <div className="space-y-2 col-span-12 sm:col-span-6">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-8 w-full" />
            </div>
            <div className="space-y-2 col-span-12 lg:col-span-6">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-8 w-full" />
            </div>
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-25" />
            <Skeleton className="h-25 w-full" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default loading