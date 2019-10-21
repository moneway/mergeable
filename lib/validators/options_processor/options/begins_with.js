const MATCH_NOT_FOUND_ERROR = `Failed to run the test because 'match' is not provided for 'begins_with' option. Please check README for more information about configuration`
const UNKNOWN_MATCH_TYPE_ERROR = `'match' type invalid, expected string or Array type`
const UNKNOWN_INPUT_TYPE_ERROR = `Input type invalid, expected string or Array as input`

class BeginsWith {
  static process (validatorContext, input, rule) {
    const filter = rule.begins_with

    const match = filter['match']
    let on_success = filter['on_success']
    let on_failure = filter['on_failure']
    if (!match) {
      throw new Error(MATCH_NOT_FOUND_ERROR)
    }

    if (!on_success) on_success = `${validatorContext.name} does begins with '${match}'`
    if (!on_failure) on_failure = `${validatorContext.name} must begins with "${match}"`

    let isMergeable

    try {
      isMergeable = checkIfMergeable(input, match)
    } catch (err) {
      throw new Error(UNKNOWN_INPUT_TYPE_ERROR)
    }

    return {
      status: isMergeable ? 'pass' : 'fail',
      description: isMergeable ? on_success : on_failure
    }
  }
}

function checkIfMergeable (input, match) {
  if (typeof input !== 'string' && !Array.isArray(input)) {
    throw new Error(UNKNOWN_INPUT_TYPE_ERROR)
  }

  if (typeof match !== 'string' && !Array.isArray(match)) {
    throw new Error(UNKNOWN_MATCH_TYPE_ERROR)
  }

  if (typeof input === 'string') {
    return checkIfInputMatches(match, (item) => input.indexOf(item) === 0)
  } else {
    return input.some(inputItem =>
      checkIfInputMatches(match, (matchItem) => inputItem.indexOf(matchItem) === 0)
    )
  }
}

function checkIfInputMatches (match, func) {
  if (typeof match === 'string') {
    return func(match)
  } else {
    return match.some(item => func(item))
  }
}

module.exports = BeginsWith
