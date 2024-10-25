
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { type ReactNode } from "react";

const DashboardLayout = ({
 children
}: {
 children: ReactNode;
}) => {
  return (
    <div className="min-h-screen">
      <div className="flex w-full h-full">
        <div className="fixed lef-0 top-0 hidden lg:block lg:w-[264px] h-full overflow-y-auto">
          <Sidebar />
        </div>
        <div className="lg:pl-[264px] w-full">
          <div className="mx-auto max-screen-2xl h-full">
            <Navbar />
            <main className="h-full py-8 px-6 flex flex-col">
              {children}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;