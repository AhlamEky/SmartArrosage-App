import { Redirect } from "expo-router";
import { getAuth } from "./auth";

export default function Index() {
  const estConnecte = getAuth();
  return <Redirect href={estConnecte ? "/dashboard/accueil" : "/connexion"} />;
}
