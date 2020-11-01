import { useState, useEffect } from "react";

export const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getContacts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("https://randomuser.me/api/?results=200");
        const { results } = await response.json();
        setContacts(results);
        setIsError(false);
      } catch (e) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getContacts();
  }, []);

  if (isLoading) {
    return <div>...loading</div>;
  }

  if (isError) {
    return <div>...error</div>;
  }
  return <div>Contacts {contacts[0].name.first}</div>;
};
