FROM mongo:4.2.3

LABEL mantainer="UST-Blockchain Team"

ARG init_file

RUN echo -e $init_file
COPY $init_file /docker-entrypoint-initdb.d/
