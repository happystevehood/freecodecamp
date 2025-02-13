#! /bin/bash

PSQL="psql -X --username=freecodecamp --dbname=salon --tuples-only -c"

#echo -e "\n~~~~~ Steve's Salon ~~~~~\n"

#echo $($PSQL "TRUNCATE appointments, customers;")

MAIN_MENU() {
  if [[ $1 ]]
  then
    echo -e "\n$1"
  fi

  # get the available services from Table
  AVAILABLE_SERVICE=$($PSQL "SELECT service_id, name FROM services")

  #unable to get any services
  if [[ -z AVAILABLE_SERVICE ]]
  then
    echo "No Services Found"
  else    
    # display the services to the user
    #echo -e "\nHere are the services we have available:"
    echo "$AVAILABLE_SERVICE" | while read SERVICE_ID BAR SERVICE_NAME
    do
      echo "$SERVICE_ID) $SERVICE_NAME"
    done

    echo -e "\nPlease enter your requested service_id";
    # Read the user selection
    read SERVICE_ID_SELECTED; 

    # if input is not a number
    if [[ ! $SERVICE_ID_SELECTED =~ ^[0-9]+$ ]]
    then
      # send to main menu
      MAIN_MENU  "That is not a valid service number."
    else

      # is Service available for selection
      SERVICE_AVAILABILITY=$($PSQL "SELECT service_id FROM services WHERE service_id = $SERVICE_ID_SELECTED")
      
      # if not available
      if [[ -z $SERVICE_ID_SELECTED ]]
      then
        # send to main menu
        MAIN_MENU "That is not an available service."
      else

        #get name
        SERVICE_NAME=$($PSQL "SELECT name FROM services WHERE service_id = $SERVICE_ID_SELECTED")

        echo -e "\nNow your phone number";
        read CUSTOMER_PHONE; 
    

        # if no phone number and 3rd param available.
        if [[ -z $CUSTOMER_PHONE ]]
        then
          # send to main menu
          echo "Phone number is needed"
        else
          #check if existing customer.
          EXISTING_CUSTOMER=$($PSQL "SELECT * FROM customers WHERE phone = '$CUSTOMER_PHONE'")

          # if not existing cutomers
          if [[ -z $EXISTING_CUSTOMER ]]
          then
            #add new customer
            #echo "New Customer $EXISTING_CUSTOMER $CUSTOMER_PHONE"

            echo -e "\nNow your name";
            read CUSTOMER_NAME; 
          
            echo -e "\n Now your preferred time";
            read SERVICE_TIME;

            #confirm if TIME input
            if [[ -z $CUSTOMER_NAME || -z $SERVICE_TIME ]]
            then
              echo "Its mandatory to input name and time!"
            else

              #create new customer entry
              #echo "Create new customer"

              # insert new customer
              INSERT_CUSTOMER_RESULT=$($PSQL "INSERT INTO customers(phone, name) VALUES('$CUSTOMER_PHONE', '$CUSTOMER_NAME')")

              # get customer_id
              CUSTOMER_ID=$($PSQL "SELECT customer_id FROM customers WHERE phone = '$CUSTOMER_PHONE'")

              # make service booking
              INSERT_SERVICE_RESULT=$($PSQL "INSERT INTO appointments(customer_id, service_id, time) VALUES('$CUSTOMER_ID', '$SERVICE_ID_SELECTED', '$SERVICE_TIME')")

              echo "I have put you down for a $SERVICE_NAME at $SERVICE_TIME, $CUSTOMER_NAME."

            fi
            
          else
            #echo "Existing Customer $EXISTING_CUSTOMER"

            echo -e "\nNow your preferred time";
            read SERVICE_TIME;

             #get customer name
             CUSTOMER_NAME=$($PSQL "SELECT name FROM customers WHERE phone = '$CUSTOMER_PHONE'");
             #echo "TIME $SERVICE_TIME NAME $CUSTOMER_NAME"

            # get customer_id
            CUSTOMER_ID=$($PSQL "SELECT customer_id FROM customers WHERE phone = '$CUSTOMER_PHONE'")

            # make service booking
            INSERT_SERVICE_RESULT=$($PSQL "INSERT INTO appointments(customer_id, service_id) VALUES('$CUSTOMER_ID', '$SERVICE_ID_SELECTED', '$SERVICE_TIME')")

            echo "I have put you down for a $SERVICE_NAME at $SERVICE_TIME, $CUSTOMER_NAME."

          fi
        fi
      fi
    fi
  fi
}


MAIN_MENU
