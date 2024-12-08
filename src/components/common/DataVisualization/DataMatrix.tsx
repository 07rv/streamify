"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useDataMatrixStore } from "@/store/store";
import { Activity, DollarSign, FolderOpenDot, UsersRound } from "lucide-react";

const DataMatrix = () => {
  const { state } = useDataMatrixStore();
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {state?.revenue?.totalRevenue}
          </div>
          <p className="text-xs text-muted-foreground">
            {state?.revenue?.advertisements} from advertisements
          </p>
          <p className="text-xs text-muted-foreground">
            {state?.revenue?.subscriptions} from subscriptions
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Users</CardTitle>
          <UsersRound className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{state?.users?.totalUser}</div>
          <p className="text-xs font-medium">active users</p>
          <p className="text-xs text-muted-foreground">
            {state?.users?.activeUser}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Streams</CardTitle>
          <FolderOpenDot className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{state?.totalStream}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Top Artist</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{state?.topArtist?.name}</div>
          <p className="text-xs text-muted-foreground">
            Streams: {state?.topArtist?.totalStream}
          </p>
        </CardContent>
      </Card>
    </>
  );
};

export default DataMatrix;
