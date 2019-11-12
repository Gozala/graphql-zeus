import chalk from "chalk";
import { Gql, SpecialSkills, Zeus } from "./graphql-zeus";
const printQueryResult = (name, result) =>
  console.log(
    `${chalk.greenBright(name)} result:\n${chalk.cyan(JSON.stringify(result, null, 4))}\n\n`,
  );
const printGQLString = (name, result) =>
  console.log(`${chalk.blue(name)} query:\n${chalk.magenta(result)}\n\n`);
const run = async () => {
  const { addCard: ZeusCard } = await Gql.Mutation({
    addCard: [
      {
        card: {
          Attack: 1,
          Defense: 2,
          description: "aa",
          name: "SADSD",
          skills: [SpecialSkills.FIRE],
        },
      },
      {
        skills: true,
        Children: true,
        cardImage: {
          bucket: true,
        },
      },
    ],
  });
  printQueryResult("ZeusCard", ZeusCard);

  const blalba = await Gql.Query({
    drawChangeCard: {
      "__typename": true,
      "...on EffectCard": {
        effectSize: true,
        name: true,
      },
      "...on SpecialCard": {
        name: true,
      },
    },
  });
  printQueryResult("drawChangeCard", blalba.drawChangeCard);
  // const { addCard: ZeusCard } = await chain.Mutation({
  //   addCard: [
  //     {
  //       card: {
  //         Attack: 1,
  //         Defense: 2,
  //         description: "aa",
  //         name: "SADSD",
  //         skills: [SpecialSkills.FIRE],
  //       },
  //     },
  //     {
  //  __alias:{
  //    otherAttack:{
  //
  // }
  //  }
  //       name: true,
  //       Attack: true,
  //       Defense: true,
  //       description: true,
  //     },
  //   ],
  // });
  //
  // The way it should be returned
  // ZeusCard.__alias["myAlias"].Attack
  const { listCards: stack, drawCard: newCard } = await Gql.Query({
    listCards: {
      name: true,
      cardImage: {
        bucket: true,
      },
    },
    drawCard: {
      Attack: true,
    },
  });

  printQueryResult("stack", stack);
  printQueryResult("newCard", newCard);

  const aliasedQuery = Zeus.Query({
    __alias: {
      myCards: {
        listCards: {
          name: true,
        },
      },
    },
    listCards: {
      __alias: {
        atak: {
          attack: [
            { cardID: ["1"] },
            {
              name: true,
              description: true,
              __alias: {
                bbb: {
                  Defense: true,
                },
              },
            },
          ],
        },
      },
    },
  });
  console.log(aliasedQuery);
  const aliasedQueryExecute = await Gql.Query({
    listCards: {
      __alias: {
        atak: {
          attack: [
            { cardID: ["1"] },
            {
              name: true,
              Defense: true,
            },
          ],
        },
      },
      id: true,
    },
  });
  console.log(JSON.stringify(aliasedQueryExecute, null, 4));
  console.log(
    JSON.stringify(
      aliasedQueryExecute.listCards.map((card) => card.atak.attack.map((aa) => aa.name)),
      null,
      4,
    ),
  );

  const interfaceTest = await Gql.Query({
    nameables: {
      "__typename": true,
      "name": true,
      "...on CardStack": {
        cards: {
          Defense: true,
        },
      },
      "...on Card": {
        Attack: true,
      },
    },
  });
};
run();
