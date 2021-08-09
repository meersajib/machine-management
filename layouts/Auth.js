export default function Auth({ children }) {
  return (
    <>
      <main>
        <section style={{
              backgroundColor: '#000000'
            }} className="relative w-full h-full py-40 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-full"
            
          ></div>
          {children}
        </section>
      </main>
    </>
  );
}
