#!/bin/bash

PSQL="psql -X --username=freecodecamp --dbname=number_guess --tuples-only -c"

#echo -e "\n~~~~~ Steve's Salon ~~~~~\n"

#echo $($PSQL "TRUNCATE user_info;")

#init number of guess this run
NUM_GUESSES=0
BESTGAME=0

USER_GUESS () {
  if [[ $1 ]]
  then
    echo -e "\n$1"
  fi
  read USER_GUESS

  # if input is not a number
  if [[ ! $USER_GUESS =~ ^[0-9]+$ ]]
  then
    # send to main menu
    USER_GUESS "That is not an integer, guess again:"
    
  else

    #increment # of guesses
    NUM_GUESSES=$((NUM_GUESSES+1))

    #if the number is lower
    if ((USER_GUESS > RANDOM_NUMBER_1_1000))
    then
      USER_GUESS "It's lower than that, guess again:"

    #if the number is higher
    else 
      if ((USER_GUESS < RANDOM_NUMBER_1_1000))
      then 

        USER_GUESS "It's higher than that, guess again:"

      else
        #if the number is same
        echo You guessed it in $NUM_GUESSES tries. The secret number was $RANDOM_NUMBER_1_1000. Nice job!

        #need to update database

        #inc games played
        GAMESPLAYED=$((GAMESPLAYED+1))

        #if num guess is the new low score
        if ((BESTGAME == 0 ))
        then
          BESTGAME=$NUM_GUESSES
        else
          if ((NUM_GUESSES < BESTGAME ))
          then
            BESTGAME=$NUM_GUESSES
          fi
        fi

        # insert new customer
        DELETE_USER_RESULT=$($PSQL "DELETE FROM user_info WHERE username='$USERNAME'")
        INSERT_USER_RESULT=$($PSQL "INSERT INTO user_info(username, games_played, best_game) VALUES('$USERNAME','$GAMESPLAYED','$BESTGAME')")

      fi
    fi
  fi
}



echo Enter your username:
read USERNAME;

 #confirm if TIME input
if [[ -z $USERNAME ]]
then
  echo "Its mandatory to PROVIDE USERNAME" $USERNAME
else

  #You could confirm if USERNAME is longer than 22 chars....

  #check if username in database
  EXISTING_USERNAME=$($PSQL "SELECT username FROM user_info WHERE username = '$USERNAME'") 

  if [[ -z $EXISTING_USERNAME ]]
  then

    #Initialise vars
    GAMESPLAYED=0
    BESTGAME=0

    echo Welcome, $USERNAME! It looks like this is your first time here.

  else
    GAMESPLAYED=$($PSQL "SELECT games_played FROM user_info WHERE username = '$USERNAME'")
    BESTGAME=$($PSQL "SELECT best_game FROM user_info WHERE username = '$USERNAME'")
 
    echo Welcome back, $USERNAME! You have played $GAMESPLAYED games, and your best game took $BESTGAME guesses.
  fi

  #generate my own random number.
  # $RANDOM Generate a random number between 0 and 32767 
  
  # Generate a random number between 1 and 1000
  RANDOM_NUMBER_1_1000=$(((RANDOM+1) % 1000))
  echo "Random number between 1 and 1000: $RANDOM_NUMBER_1_1000"

  USER_GUESS "Guess the secret number between 1 and 1000:"

fi