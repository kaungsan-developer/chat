import SideBar from "../components/SideBar";

export default function Home() {
  return (
    <div className="flex">
      <div className="w-1/4">
        <SideBar />
      </div>
      <div className="h-full bg-accent w-full">hell</div>
    </div>
  );
}
