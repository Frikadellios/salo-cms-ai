export type SiteConfig = {
  website: string
  author: string
  title?: {
    [key: string]: string
  }
  description?: {
    [key: string]: string
  }
  lang?: string
  ogLocale?: string
  metaTitle: {
    [key: string]: string
  }
  metaDescription: {
    [key: string]: string
  }
  ogImage?: string
  lightAndDarkMode?: boolean
  shareMessage?: {
    [key: string]: string
  }
  paginationSize?: number
  postPerPage: number
  scheduledPostMargin: number
}
