import "react-native";

import * as React from "react";
import renderer from "react-test-renderer";
import RecipeListItem from "../RecipesListItem";
import { Recipe } from "../../constants/Types";
import { NavigationContainer } from "@react-navigation/native";
import { render, fireEvent } from "@testing-library/react-native";
jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper");

describe("[RecipeListItem]", () => {
  const recipeItem: Recipe = {
    id: "recipe18",
    title: "Tartare au couteau de bœuf charolais au basilic",
    time: "35 min",
    imgUrl:
      "https://s3.eu-central-1.amazonaws.com/media.quitoque.fr/recipe_w1536_h1024/recipes/images/tartare-au-couteau-de-buf-charolais-au-basilic/tartare-au-couteau-de-buf-charolais-au-basilic-1.jpg",
    ingredients: [
      {
        label: "Basilic (botte)",
        quantity: "(15g)",
      },
      {
        label: "Citron jaune",
        quantity: "(50g)",
      },
      {
        label: "Pavés charolais marinés",
        quantity: "(280 g)",
      },
      {
        label: "Pommes de terre jaunes",
        quantity: "(500 g)",
      },
      {
        label: "Roquette",
        quantity: "(40 g)",
      },
      {
        label: "Tomate ronde",
        quantity: "(96g)",
      },
      {
        label: "Échalote",
        quantity: "(15g)",
      },
    ],
    instructions: [
      {
        step: 1,
        title: "Avant de commencer",
        instruction:
          "Préchauffez votre four à 240°C.\nLisez toutes les étapes, sortez les ingrédients (sauf le boeuf) et ustensiles nécessaires et rincez les fruits et légumes !\nN'hésitez pas à utiliser une grande plaque ou deux (pour 4 et 5 personnes) pour cuire les frites. Il est préférable qu'elles ne se chevauchent pas trop. La chaleur sera ainsi mieux répartie et elles cuiront plus rapidement !",
      },
      {
        step: 2,
        title: "Les frites",
        instruction:
          "Coupez les pommes de terre en forme de frites (1 cm environ).\nDéposez-les sur une plaque allant au four. Versez un filet d'huile d'olive, salez, poivrez. Mélangez bien pour toutes les enrober.\nEnfournez 20 à 25 min jusqu'à ce qu'elles soient cuites et dorées. A mi-cuisson, retournez-les.",
      },
      {
        step: 3,
        title: "L'assaisonnement du tartare",
        instruction:
          "Dans un saladier, déposez au fur et à mesure les ingrédients suivants :\nCoupez en deux, pelez et ciselez (coupez en petits dés) l'échalote (elle sera dégustée crue).\nEffeuillez et ciselez (hachez) le basilic.\nCoupez la tomate en petits dés.\nDans un bol, pressez le citron jaune. Ajoutez l'huile d'olive. Mélangez bien.",
      },
      {
        step: 4,
        title: "A table !",
        instruction:
          "Déposez la roquette dans un saladier et assaisonnez-la d'un filet d'huile d'olive et de vinaigre balsamique. Salez, poivrez.\nSortez la viande du frigo.\nCoupez la viande en lanières puis en très petits dés à l’aide d’un couteau.\nAjoutez la viande au saladier avec l'échalote, la tomate et le basilic. Salez, poivrez. Mélangez bien.\nVersez petit à petit le mélange citron/ huile d'olive pour assaisonner votre viande à votre goût.\n\n ",
      },
    ],
  };

  it("RecipeListItem renders without crashing", () => {
    const testRenderer = renderer.create(
      <RecipeListItem
        item={recipeItem}
        navigate={() => console.log("navigate")}
      />
    );
    const tree = testRenderer.toJSON();
    expect(tree).toMatchSnapshot();
  });

  // it("clicking on one item takes you to the details screen", async () => {
  //   const component = (
  //     <RecipeListItem
  //       item={recipeItem}
  //       navigate={() => console.log("navigate")}
  //     />
  //   );

  //   const { findByText, getByTestId } = render(component);
  //   const toClick = await getByTestId("recipeListItemTouchable");

  //   fireEvent(toClick, "press");
  //   const newHeader = await findByText(recipeItem.title);
  //   const newBody = await findByText("Ajouter à la liste de course");

  //   expect(newHeader).toBeTruthy();
  //   expect(newBody).toBeTruthy();
  // });
});
