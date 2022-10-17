FROM node:16-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev --ignore-scripts
COPY . .


FROM base AS build
ARG NEXT_PUBLIC_CAPTCHA_KEY
ENV NEXT_PUBLIC_CAPTCHA_KEY=$NEXT_PUBLIC_CAPTCHA_KEY
ARG NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL
ENV NODE_ENV=production
WORKDIR /build
COPY --from=base /app ./
RUN npm run build


FROM node:16-alpine 
ARG NEXT_PUBLIC_CAPTCHA_KEY
ENV NEXT_PUBLIC_CAPTCHA_KEY=$NEXT_PUBLIC_CAPTCHA_KEY
ARG NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL
ENV NODE_ENV=production

RUN addgroup -g 1001 -S user_group
RUN adduser -S application -u 1001
WORKDIR /app

COPY --from=build --chown=application:user_group /build/package*.json ./
COPY --from=build --chown=application:user_group /build/node_modules ./node_modules
COPY --from=build --chown=application:user_group /build/public ./public
COPY --from=build --chown=application:user_group /build/.next ./.next
COPY --from=build --chown=application:user_group /build/i18n.json ./i18n.json
RUN npm install next




# FROM node:16-alpine 

# RUN addgroup -g 1001 -S user_group
# RUN adduser -S application -u 1001
# RUN mkdir -p /usr/app/
# WORKDIR /usr/app
# COPY --from=BUILD_IMAGE --chown=application:user_group /usr/app/.env.production ./
# COPY --from=BUILD_IMAGE --chown=application:user_group /usr/app/package.json /usr/app/package-lock.json ./
# COPY --from=BUILD_IMAGE --chown=application:user_group /usr/app/node_modules ./node_modules
# COPY --from=BUILD_IMAGE --chown=application:user_group /usr/app/public ./public
# COPY --from=BUILD_IMAGE --chown=application:user_group /usr/app/.next ./.next
# COPY --from=BUILD_IMAGE --chown=application:user_group /usr/app/i18n.json ./i18n.json
# RUN npm install next

EXPOSE 3000

CMD [ "npm", "run", "start" ]
