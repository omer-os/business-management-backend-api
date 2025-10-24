export {};

declare global {
  namespace PrismaJson {
    // Define a type for a user's profile information.
    type ThemeConfig = {
      theme: "dark" | "light";
    };

    type structureNode = {
      type: "category" | "item";
      id: string;
      children?: structureNode[];
    };

    type menuStructure = structureNode[];

    type LocalString = {
      en?: string;
      ar?: string;
      ku?: string;
      tr?: string;
      [key: string]: string | undefined;
    };
  }
}
