/**
 * 🗳️ Panchayat Election System - Capstone
 *
 * Village ki panchayat election ka system bana! Yeh CAPSTONE challenge hai
 * jisme saare function concepts ek saath use honge:
 * closures, callbacks, HOF, factory, recursion, pure functions.
 *
 * Functions:
 *
 *   1. createElection(candidates)
 *      - CLOSURE: private state (votes object, registered voters set)
 *      - candidates: array of { id, name, party }
 *      - Returns object with methods:
 *
 *      registerVoter(voter)
 *        - voter: { id, name, age }
 *        - Add to private registered set. Return true.
 *        - Agar already registered or voter invalid, return false.
 *        - Agar age < 18, return false.
 *
 *      castVote(voterId, candidateId, onSuccess, onError)
 *        - CALLBACKS: call onSuccess or onError based on result
 *        - Validate: voter registered? candidate exists? already voted?
 *        - If valid: record vote, call onSuccess({ voterId, candidateId })
 *        - If invalid: call onError("reason string")
 *        - Return the callback's return value
 *
 *      getResults(sortFn)
 *        - HOF: takes optional sort comparator function
 *        - Returns array of { id, name, party, votes: count }
 *        - If sortFn provided, sort results using it
 *        - Default (no sortFn): sort by votes descending
 *
 *      getWinner()
 *        - Returns candidate object with most votes
 *        - If tie, return first candidate among tied ones
 *        - If no votes cast, return null
 *
 *   2. createVoteValidator(rules)
 *      - FACTORY: returns a validation function
 *      - rules: { minAge: 18, requiredFields: ["id", "name", "age"] }
 *      - Returned function takes a voter object and returns { valid, reason }
 *
 *   3. countVotesInRegions(regionTree)
 *      - RECURSION: count total votes in nested region structure
 *      - regionTree: { name, votes: number, subRegions: [...] }
 *      - Sum votes from this region + all subRegions (recursively)
 *      - Agar regionTree null/invalid, return 0
 *
 *   4. tallyPure(currentTally, candidateId)
 *      - PURE FUNCTION: returns NEW tally object with incremented count
 *      - currentTally: { "cand1": 5, "cand2": 3, ... }
 *      - Return new object where candidateId count is incremented by 1
 *      - MUST NOT modify currentTally
 *      - If candidateId not in tally, add it with count 1
 *
 * @example
 *   const election = createElection([
 *     { id: "C1", name: "Sarpanch Ram", party: "Janata" },
 *     { id: "C2", name: "Pradhan Sita", party: "Lok" }
 *   ]);
 *   election.registerVoter({ id: "V1", name: "Mohan", age: 25 });
 *   election.castVote("V1", "C1", r => "voted!", e => "error: " + e);
 *   // => "voted!"
 */
export function createElection(candidates) {
  // Your code here
  let registeredVoters = {};
  let votesCount = {};
  let hasVoted = {};

  for (let c of candidates) {
    votesCount[c.id] = 0;
  }

  return {
    registerVoter: function (voter) {
      if (!voter || !voter.id || voter.age < 18) return false;
      if (registeredVoters[voter.id]) return false;

      registeredVoters[voter.id] = voter;
      return true;
    },

    castVote: function (voterId, candidateId, onSuccess, onError) {
      if (!registeredVoters[voterId]) return onError("voter not registered");
      if (hasVoted[voterId]) return onError("already voted");
      if (votesCount[candidateId] === undefined) return onError("invalid candidate");

      votesCount[candidateId] = votesCount[candidateId] + 1;
      hasVoted[voterId] = true;

      return onSuccess({ voterId: voterId, candidateId: candidateId });
    },

    getResults: function (sortFn) {
      let results = [];
      for (let c of candidates) {
        results.push({
          id: c.id,
          name: c.name,
          party: c.party,
          votes: votesCount[c.id]
        });
      }

      if (typeof sortFn === "function") {
        results.sort(sortFn);
      } else {
        results.sort(function (a, b) {
          return b.votes - a.votes;
        });
      }
      return results;
    },

    getWinner: function () {
      let results = this.getResults();
      let totalVotes = 0;
      for (let r of results) { totalVotes += r.votes; }

      if (totalVotes === 0) return null;

      let winnerInfo = results[0];
      for (let c of candidates) {
        if (c.id === winnerInfo.id) return c;
      }
      return null;
    }
  };
}


export function createVoteValidator(rules) {
  // Your code here
  return function (voter) {
    if (!voter) return { valid: false, reason: "no voter data" };

    for (let field of rules.requiredFields) {
      if (voter[field] === undefined) {
        return { valid: false, reason: "missing " + field };
      }
    }

    if (voter.age < rules.minAge) {
      return { valid: false, reason: "underage" };
    }

    return { valid: true, reason: "all good" };
  };
}


export function countVotesInRegions(regionTree) {
  // Your code here
  if (!regionTree) return 0;

  let total = regionTree.votes || 0;

  if (Array.isArray(regionTree.subRegions)) {
    for (let sub of regionTree.subRegions) {
      total = total + countVotesInRegions(sub);
    }
  }

  return total;
}


export function tallyPure(currentTally, candidateId) {
  // Your code here
  let newTally = { ...currentTally };

  if (newTally[candidateId]) {
    newTally[candidateId] = newTally[candidateId] + 1;
  } else {
    newTally[candidateId] = 1;
  }

  return newTally;
}
