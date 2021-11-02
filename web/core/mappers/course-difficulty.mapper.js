import ECourseDifficulty from "../types"

const CourseDefficultyMapper = {
    toFormat(difficulty) { 
        switch (difficulty) {
            case ECourseDifficulty.UNSPECIFIED:
              return "Neuvedena"
            case ECourseDifficulty.BEGINNER:
              return "Začátečník"
            case ECourseDifficulty.ADVANCED:
              return "Pokročilý"
            case ECourseDifficulty.EXPERT:
              return "Expert"
          }
    }
}

export default CourseDefficultyMapper

