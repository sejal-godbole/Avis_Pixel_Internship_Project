// ===== SSR SAFE STORAGE WRAPPER =====
const isBrowser = typeof window !== "undefined"

const safeStorage = {
  get: (key: string) => {
    if (!isBrowser) return null
    return window.localStorage.getItem(key)
  },
  set: (key: string, value: string) => {
    if (!isBrowser) return
    window.localStorage.setItem(key, value)
  },
  remove: (key: string) => {
    if (!isBrowser) return
    window.localStorage.removeItem(key)
  },
}

// ================= TYPES =================

export type Student = {
  id: string
  first_name: string
  last_name: string
  email?: string
  date_of_birth?: string
  gender?: string
  parent_contact?: string
  address?: string
  created_at: string
}

export type Teacher = {
  id: string
  full_name: string
  email?: string
  phone?: string
  created_at: string
}

export type User = {
  id: string
  email: string
  role: "admin" | "teacher" | "student"
  created_at: string
  name?: string
}

// ================= AUTH =================

export const auth = {
  signIn: async (email: string, password: string) => {
    if (email && password.length >= 6) {
      const user: User = {
        id: "1",
        email,
        role: "admin",
        created_at: new Date().toISOString(),
      }
      safeStorage.set("auth_user", JSON.stringify(user))
      return { user, error: null }
    }
    return { user: null, error: "Invalid credentials" }
  },

  signUp: async (email: string, password: string) => {
    if (email && password.length >= 6) {
      const user: User = {
        id: Date.now().toString(),
        email,
        role: "admin",
        created_at: new Date().toISOString(),
      }
      safeStorage.set("auth_user", JSON.stringify(user))
      return { user, error: null }
    }
    return { user: null, error: "Password must be at least 6 characters" }
  },

  signOut: async () => {
    safeStorage.remove("auth_user")
    return { error: null }
  },

  getUser: (): User | null => {
    const stored = safeStorage.get("auth_user")
    return stored ? JSON.parse(stored) : null
  },

  quickLogin: (role: "admin" | "teacher" | "student") => {
    const email =
      role === "admin"
        ? "admin@school.com"
        : role === "teacher"
        ? "teacher@college.com"
        : "student@school.com"

    const user: User = {
      id: `${role}-${Date.now()}`,
      email,
      role,
      name: role.charAt(0).toUpperCase() + role.slice(1),
      created_at: new Date().toISOString(),
    }

    safeStorage.set("auth_user", JSON.stringify(user))
    return { user }
  },
}

// ================= DATABASE =================

const createCollection = (key: string) => ({
  getAll: () => {
    const stored = safeStorage.get(key)
    return stored ? JSON.parse(stored) : []
  },

  insert: (data: any) => {
    const items = createCollection(key).getAll()
    const newItem = {
      ...data,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
    }
    items.push(newItem)
    safeStorage.set(key, JSON.stringify(items))
    return newItem
  },

  update: (id: string, updates: any) => {
    const items = createCollection(key).getAll()
    const index = items.findIndex((i: any) => i.id === id)
    if (index === -1) return null

    items[index] = { ...items[index], ...updates }
    safeStorage.set(key, JSON.stringify(items))
    return items[index]
  },

  delete: (id: string) => {
    const items = createCollection(key).getAll()
    const filtered = items.filter((i: any) => i.id !== id)
    safeStorage.set(key, JSON.stringify(filtered))
    return true
  },
})

export const db = {
  students: createCollection("students"),
  teachers: createCollection("teachers"),
  subjects: createCollection("subjects"),
  classes: createCollection("classes"),
  attendance: createCollection("attendance"),
  grades: createCollection("grades"),
  fees: createCollection("fees"),
}

// ================= SEED DATA =================

const initializeSeedData = () => {
  if (!isBrowser) return

  if (!safeStorage.get("students")) {
    safeStorage.set("students", JSON.stringify([]))
  }
  if (!safeStorage.get("teachers")) {
    safeStorage.set("teachers", JSON.stringify([]))
  }
  if (!safeStorage.get("subjects")) {
    safeStorage.set("subjects", JSON.stringify([]))
  }
  if (!safeStorage.get("classes")) {
    safeStorage.set("classes", JSON.stringify([]))
  }
  if (!safeStorage.get("attendance")) {
    safeStorage.set("attendance", JSON.stringify([]))
  }
  if (!safeStorage.get("grades")) {
    safeStorage.set("grades", JSON.stringify([]))
  }
  if (!safeStorage.get("fees")) {
    safeStorage.set("fees", JSON.stringify([]))
  }
}

initializeSeedData()

// Optional helpers
export const getStudents = () => db.students.getAll()
export const getTeachers = () => db.teachers.getAll()
export const getSubjects = () => db.subjects.getAll()
export const getClasses = () => db.classes.getAll()
export const getAttendance = () => db.attendance.getAll()
export const getGrades = () => db.grades.getAll()
export const getFees = () => db.fees.getAll()