export interface PersonaData {
  role: string;
  department: string;
  permissions: string[];
  background: {
    tenure: string;
    specialization: string;
    recentPerformance: string;
    focusArea: string;
  };
}

export interface Persona {
  name: string;
  title: string;
  data: PersonaData;
}

export const PERSONAS: Persona[] = [
  {
    name: "Siddhant",
    title: "Support Associate",
    data: {
      role: "Support",
      department: "Customer Success",
      permissions: ["read:alerts", "create:comments", "resolve:low-priority"],
      background: {
        tenure: "1.5 years",
        specialization: "Technical Troubleshooting",
        recentPerformance: "Exceeds Expectations",
        focusArea: "Database Connectivity Issues"
      }
    }
  },
  {
    name: "Rupesh",
    title: "Support Associate",
    data: {
      role: "Support",
      department: "Customer Success",
      permissions: ["read:alerts", "create:comments", "resolve:low-priority"],
      background: {
        tenure: "2 years",
        specialization: "User Onboarding",
        recentPerformance: "Met Expectations",
        focusArea: "Account Access & Auth"
      }
    }
  },
  {
    name: "Shankar",
    title: "Technical Support",
    data: {
      role: "Support",
      department: "Engineering Support",
      permissions: ["read:alerts", "create:comments", "resolve:medium-priority", "access:logs"],
      background: {
        tenure: "3 years",
        specialization: "Cloud Infrastructure",
        recentPerformance: "Exceeds Expectations",
        focusArea: "Server Latency & API Failures"
      }
    }
  },
  {
    name: "Simran",
    title: "Support Manager",
    data: {
      role: "Manager",
      department: "Customer Success",
      permissions: ["read:alerts", "resolve:all", "manage:team", "view:reports"],
      background: {
        tenure: "5 years",
        specialization: "Operations Management",
        recentPerformance: "Exceeds Expectations",
        focusArea: "SLA Compliance & Team Velocity"
      }
    }
  },
  {
    name: "Piyush",
    title: "VP of Support",
    data: {
      role: "VP of Support",
      department: "Executive",
      permissions: ["read:all", "admin:all", "view:executive-dashboard"],
      background: {
        tenure: "8 years",
        specialization: "Strategic Leadership",
        recentPerformance: "Outstanding",
        focusArea: "System Reliability & Unit Economics"
      }
    }
  }
];
