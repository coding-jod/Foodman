import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
  const [DUMMY_MEALS, setDummyMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://react-meals-6a158-default-rtdb.firebaseio.com/meals.json"
      );
      if (!response.ok) {
        throw new Error("Kuch to hua hai");
      }
      const mealsdata = await response.json();
      let loadedmeals = [];
      for (const key in mealsdata) {
        loadedmeals.push({
          id: key,
          name: mealsdata[key].name,
          description: mealsdata[key].description,
          price: mealsdata[key].price,
        });
      }
      setDummyMeals(loadedmeals);
      setIsLoading(false);
    };
    fetchMeals().catch((error) => {
      setHasError(error);
      setIsLoading(false);
    });
  }, []);
  if (isLoading) {
    return (
      <section className={classes.meals}>
        <Card>
          <p>Loading...</p>
        </Card>
      </section>
    );
  }
  if(hasError) {
    return (
      <section className={classes.meals}>
        <Card>
          <p>{hasError.message}</p>
        </Card>
      </section>
    );
    
  }
  const mealsList = DUMMY_MEALS.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
