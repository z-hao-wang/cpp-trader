git add -A
BRANCH=`git rev-parse --abbrev-ref HEAD`
echo ${BRANCH}
COMMIT_MSG=$(LANG=C git -c color.status=false status \
| sed -n -E -e '1,/Changes to be committed:/ d'\
            -e '1,1 d' \
            -e '/git reset/ d' \
            -e '/^Untracked files:/,$ d' \
            -e 's/^\s*//' \
            -e 's/	modified:   //' \
            -e '/./p')
FIRST_FILE=${COMMIT_MSG%%$'\n'*}
git commit -m "[${BRANCH_NAME}] ${FIRST_FILE}"
git push origin ${BRANCH}

bash ops/buildDocker.sh ${BRANCH} && docker tag strategy-hf:${BRANCH} docker.quantsatoshi.com/strategy-hf:${BRANCH} && docker push docker.quantsatoshi.com/strategy-hf:${BRANCH}

