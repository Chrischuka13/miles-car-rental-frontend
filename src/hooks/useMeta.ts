import { useEffect } from "react";

type MetaTagsProps = {
  title?: string;
  description?: string;
  keywords?: string;
};

export default function useMetaTags({
  title,
  description,
  keywords,
}: MetaTagsProps) {
  useEffect(() => {
    // Update page title
    if (title) {
      document.title = title;
    }

    // Update meta description
    if (description) {
      let metaDescription = document.querySelector(
        'meta[name="description"]'
      );

      if (!metaDescription) {
        metaDescription = document.createElement("meta");
        metaDescription.setAttribute("name", "description");
        document.head.appendChild(metaDescription);
      }

      metaDescription.setAttribute("content", description);
    }

    // Update meta keywords
    if (keywords) {
      let metaKeywords = document.querySelector(
        'meta[name="keywords"]'
      );

      if (!metaKeywords) {
        metaKeywords = document.createElement("meta");
        metaKeywords.setAttribute("name", "keywords");
        document.head.appendChild(metaKeywords);
      }

      metaKeywords.setAttribute("content", keywords);
    }

    // Optional cleanup: reset title when page unmounts
    return () => {
      document.title = "Miles Car Rental";
    };
  }, [title, description, keywords]);
}