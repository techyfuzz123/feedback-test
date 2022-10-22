import Link from "next/link";
import { useAuthContext } from "../hooks/useAuthContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { loadUser } from "../hooks/loadUser";

const Home = () => {
  const router = useRouter();
  const { logout } = useAuthContext();
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(loadUser());
    user = loadUser();
    if (!user) {
      router.push("/login");
    }
  }, []);

  return (
    <>
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">
          go to{" "}
          {user ? (
            <span className="text-gray-50">{user.feedback.name}</span>
          ) : (
            <Link href="/login">
              <span className="text-gray-50 cursor-pointer">login</span>
            </Link>
          )}
        </h1>

        <p className="mt-3 text-2xl">
          Get started by editing{" "}
          <code className="rounded-md bg-gray-900 p-3 font-mono text-lg">
            pages/index.tsx
          </code>
        </p>

        <div className="mt-6 flex sm:w-full">
          <Link href={user ? "" : "/login"}>
            <div className="mt-6 mr-10 w-96 rounded-xl border p-6 text-left hover:text-gray-50 focus:text-gray-50">
              <h3 className="text-2xl font-bold">Login &rarr;</h3>
              <p className="mt-4 text-xl">
                Find in-depth information about Next.js features and its API.
              </p>
            </div>
          </Link>
          <div
            onClick={logout}
            className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-gray-50 focus:text-gray-50"
          >
            <h3 className="text-2xl font-bold">Logout &rarr;</h3>
            <p className="mt-4 text-xl">
              Learn about Next.js in an interactive course with quizzes!
            </p>
          </div>

        
        </div>
      </main>
    </>
  );
};

export default Home;
