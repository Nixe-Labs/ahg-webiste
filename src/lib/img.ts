import { BASE } from "./base";

/** Prefix a /public path with the deploy sub-path. */
export const img = (p: string) => BASE + p;
/** Source path of an Explore photo (pass to <Img>, which adds the sub-path itself). */
export const placeSrc = (slug: string) => `/img/explore/${slug}.jpg`;
