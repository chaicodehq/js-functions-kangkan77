/**
 * 🎉 Festival Countdown Planner - Module Pattern
 *
 * Indian festivals ka planner bana! Module pattern use karna hai —
 * matlab ek function jo ek object return kare jisme public methods hain,
 * lekin andar ka data PRIVATE rahe (bahar se directly access na ho sake).
 *
 * Function: createFestivalManager()
 *
 * Returns an object with these PUBLIC methods:
 *
 *   - addFestival(name, date, type)
 *     date is "YYYY-MM-DD" string, type is "religious"/"national"/"cultural"
 *     Returns new total count of festivals
 *     Agar name empty or date not string or invalid type, return -1
 *     No duplicate names allowed (return -1 if exists)
 *
 *   - removeFestival(name)
 *     Returns true if removed, false if not found
 *
 *   - getAll()
 *     Returns COPY of all festivals array (not the actual private array!)
 *     Each festival: { name, date, type }
 *
 *   - getByType(type)
 *     Returns filtered array of festivals matching type
 *
 *   - getUpcoming(currentDate, n = 3)
 *     currentDate is "YYYY-MM-DD" string
 *     Returns next n festivals that have date >= currentDate
 *     Sorted by date ascending
 *
 *   - getCount()
 *     Returns total number of festivals
 *
 * PRIVATE STATE: festivals array should NOT be accessible from outside.
 *   manager.festivals should be undefined.
 *   getAll() must return a COPY so modifying it doesn't affect internal state.
 *   Two managers should be completely independent.
 *
 * Hint: This is the Module Pattern — a function that returns an object
 *   of methods, all closing over shared private variables.
 *
 * @example
 *   const mgr = createFestivalManager();
 *   mgr.addFestival("Diwali", "2025-10-20", "religious");   // => 1
 *   mgr.addFestival("Republic Day", "2025-01-26", "national"); // => 2
 *   mgr.getAll(); // => [{ name: "Diwali", ... }, { name: "Republic Day", ... }]
 *   mgr.getUpcoming("2025-01-01", 1); // => [{ name: "Republic Day", ... }]
 */
export function createFestivalManager() {
  // Your code here
  let festivals = [];

  return {
    addFestival: function (name, date, type) {
      const validTypes = ["religious", "national", "cultural"];

      if (!name || typeof name !== "string" || name.trim() === "") return -1;
      if (typeof date !== "string") return -1;
      if (!validTypes.includes(type)) return -1;

      for (let f of festivals) {
        if (f.name === name) return -1;
      }

      festivals.push({
        name: name,
        date: date,
        type: type
      });

      return festivals.length;
    },

    removeFestival: function (name) {
      let index = -1;
      for (let i = 0; i < festivals.length; i++) {
        if (festivals[i].name === name) {
          index = i;
          break;
        }
      }

      if (index !== -1) {
        festivals.splice(index, 1);
        return true;
      }
      return false;
    },

    getAll: function () {
      let copy = [];
      for (let f of festivals) {
        copy.push({ ...f });
      }
      return copy;
    },

    getByType: function (type) {
      let filtered = [];
      for (let f of festivals) {
        if (f.type === type) {
          filtered.push({ ...f });
        }
      }
      return filtered;
    },

    getUpcoming: function (currentDate, n = 3) {
      let upcoming = [];

      for (let f of festivals) {
        if (f.date >= currentDate) {
          upcoming.push({ ...f });
        }
      }

      upcoming.sort(function (a, b) {
        if (a.date < b.date) return -1;
        if (a.date > b.date) return 1;
        return 0;
      });

      return upcoming.slice(0, n);
    },

    getCount: function () {
      return festivals.length;
    }
  };
}
