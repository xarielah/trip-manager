import Link from "next/link";
import { clientRoutes } from "../../lib/data/client-routes";
import Button from "../classic/button";

const ClientNav = () => {
  return (
    <nav>
      <ul className="flex space-x-6 justify-center">
        {clientRoutes.map((route) => (
          <Link href={route.link} key={route.label}>
            <li>
              <Button value={route.label} className={"text-sm"} />
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default ClientNav;
