// Clean component - no unused imports
export default function PageIllustration() {
  return (
    <>
      {/* Background Grid */}
      <div className="absolute inset-0 -z-20 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      {/* Top Glow Spotlights */}
      <div className="absolute top-0 left-0 right-0 -z-10 h-[500px] w-full overflow-hidden">
        <div className="absolute left-[20%] top-[-10%] h-[300px] w-[300px] rounded-full bg-primary-500/20 blur-[100px]" />
        <div className="absolute right-[20%] top-[-10%] h-[300px] w-[300px] rounded-full bg-purple-500/20 blur-[100px]" />
      </div>
    </>
  );
}
