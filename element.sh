#!/bin/bash
#Script pass freecodecamp learn periodic .....
PSQL="psql --username=freecodecamp --dbname=periodic_table -t --no-align -c"

if [[  -z  $1 ]]
then
  echo Please provide an element as an argument.
else

  # if argument is a number
  if [[ $1 =~ ^[0-9]+$ ]]
  then

    #Need to search table atomic number
    ATOMIC_NUM=$($PSQL "SELECT atomic_number FROM elements WHERE atomic_number='$1'")

    #if not found
    if [[ -z $ATOMIC_NUM ]]
    then
      echo I could not find that element in the database.
    else
      INFO=$($PSQL "SELECT atomic_number, symbol, elements.name, atomic_mass, melting_point_celsius, boiling_point_celsius, types.type FROM properties JOIN elements USING(atomic_number) JOIN types USING(type_id) WHERE elements.atomic_number='$ATOMIC_NUM'")
      echo $INFO | while IFS=" | " read AUTOMIC_NUM SYMBOL NAME ATOMIC_MASS MPC BPC TYPE
      do
        echo -e "The element with atomic number $AUTOMIC_NUM is $NAME ($SYMBOL). It's a $TYPE, with a mass of $ATOMIC_MASS amu. $NAME has a melting point of $MPC celsius and a boiling point of $BPC celsius."
      done
    fi

  else
  #arguement is a string

    #Need to search Symobl
    ATOMIC_NUM=$($PSQL "SELECT atomic_number FROM elements WHERE symbol='$1'  OR name='$1'")

    #if not found
    if [[ -z $ATOMIC_NUM ]]
    then
        echo I could not find that element in the database.
    else
      INFO=$($PSQL "SELECT atomic_number, symbol, elements.name, atomic_mass, melting_point_celsius, boiling_point_celsius, types.type FROM properties JOIN elements USING(atomic_number) JOIN types USING(type_id) WHERE elements.atomic_number='$ATOMIC_NUM'")
      echo $INFO | while IFS=" | " read AUTOMIC_NUM SYMBOL NAME ATOMIC_MASS MPC BPC TYPE
      do
        echo -e "The element with atomic number $AUTOMIC_NUM is $NAME ($SYMBOL). It's a $TYPE, with a mass of $ATOMIC_MASS amu. $NAME has a melting point of $MPC celsius and a boiling point of $BPC celsius."
      done
    fi
  fi
fi