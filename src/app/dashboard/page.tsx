"use client";

import BarGraph from "@/components/common/DataVisualization/BarGraph";
import DataMatrix from "@/components/common/DataVisualization/DataMatrix";
import DateTable from "@/components/common/DataVisualization/DateTable";
import LineGraph from "@/components/common/DataVisualization/LineGraph";
import PieGraph from "@/components/common/DataVisualization/PieGraph";
import DateDateRange from "@/components/common/DateDateRange";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageContainer from "@/lib/PageContainer";
import { useSetToggle } from "@/store/store";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { state, setTabState } = useSetToggle();
  const session = useSession();

  if (!session?.data?.user) {
    router.push("/");
  }
  return (
    <PageContainer>
      <div className="space-y-2">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
          <h2 className="text-2xl font-bold tracking-tight">Streamify</h2>
          <DateDateRange />
        </div>

        <Tabs
          defaultValue="overview"
          value={state.tabState ?? "overview"}
          className="space-y-4"
        >
          <TabsList>
            <TabsTrigger
              onClick={() => setTabState("overview")}
              value="overview"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              onClick={() => setTabState("analytics")}
              value="analytics"
            >
              Analytics
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <DataMatrix />
              <div className="col-span-4">
                <DateTable />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
              <div className="col-span-4">
                <BarGraph />
              </div>
              <div className="col-span-4 md:col-span-3">
                <PieGraph />
              </div>
              <div className="col-span-4">
                <LineGraph />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
}
