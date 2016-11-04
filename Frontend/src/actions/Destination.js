/**
 * @author Anthony Altieri on 10/26/16.
 */

export const goStep = (number) => {
  switch (number) {
    case 1: {
      return {
        type: 'GO_STEP_ONE',
      }
    }
    case 2: {
      return {
        type: 'GO_STEP_TWO',
      }
    }
    case 3: {
      return {
        type: 'GO_STEP_THREE',
      }
    }

    default: {
      throw new Error(`Invalid step number: ${number}`);
    }

  }
};

export const enteredCity = (city) => ({
  type: 'ENTERED_CITY',
  city,
});

export const enteredCrossStreet = (crossStreet) => ({
  type: 'ENTERED_CROSS_STREET',
  crossStreet,
});

export const removedCrossStreet = () => ({
  type: 'REMOVED_CROSS_STREET',
});

export const clearDestination = () => ({
  type: 'CLEAR_DESTINATION',
});

export const retrievedCrossStreetsData = (crossStreetsData) => ({
  type: 'RETRIEVED_CROSS_STREETS_DATA',
  crossStreetsData,
});

