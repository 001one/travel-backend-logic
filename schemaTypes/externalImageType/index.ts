import { defineType, defineField } from "sanity";
import React from "react";
import { ExternalImageInput } from "./ExternalImageInput";

export const externalImageType = defineType({
  name: "externalImage",
  type: "object",
  title: "External Image",
    components: {
    input: ExternalImageInput, // ✅ attach live preview input
  },
  fields: [
    defineField({
      name: "url",
      type: "url",
      title: "Image URL",
      validation: (Rule) =>
        Rule.uri({ scheme: ["http", "https"] })
          .required()
          .error("Enter a valid image URL"),
    }),
    defineField({
      name: "alt",
      type: "string",
      title: "Alt Text",
    }),
  ],

  // ✅ Add preview that actually shows the image
  preview: {
    select: {
      title: "alt",
      url: "url",
    },
    prepare({ title, url }) {
      return {
        title: title || "External Image",
        subtitle: url,
        media: url
          ? React.createElement("img", {
              src: url,
              alt: title || "External image",
              style: {
                objectFit: "cover",
                width: "100%",
                height: "100%",
                borderRadius: "8px",
              },
            })
          : undefined,
      };
    },
  },
});
